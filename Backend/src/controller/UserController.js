var cors = require('cors')
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios')
const esUrl = `https://khoamai:123456@localhost:9200/`
const shortid = require('shortid')
const client = require('../config/ConnectElastic')
const Index = require('../model/Index')
const User=require('../model/User')
var fs = require('fs')
const e = require('method-override')
const { CreateIndexJson } = require('../util/indexToJson')
class UserController {
    createIndexAndUpData = async (req, res) => {
        try {
            const { filename } = req.file
            const {indexname,key }=req.body;
           Index.findOne({userId: req.user._id,nameIndex:indexname}).exec(async(error, user)=>{
            if(user){
                return res.status(400).json({
                    error: 'index already exits',
                })
            }
            const sampleData = require(`../uploads/${filename}`)
            let data = ''
            for (let idx = 0; idx < sampleData.length; idx++) {
                data =
                    data +
                    `{"index":{"_index":"${
                        req.body.indexname
                    }","_id" : "${shortid.generate()}"}}` +
                    '\n'
                data =
                    data +
                    JSON.stringify(sampleData[idx]).replace('\n', '') +
                    '\n'
            }
            
            const insert = await client.bulk({ body: data })
            // const response = await axios.put(`${esUrl}_settings`, {
            //     index: {
            //         max_result_window: 1000000,
            //     },
            // })
            const index = new Index({
                userId: req.user._id,
                nameIndex: indexname.toLowerCase(),
                keyUnique:key
            })
            index.save((error, indexs) => {
                if (error) console.log(error)
            })
            res.status(201).json(insert)
           })
            /*  res.json({"getalldata":`http://localhost:3000/data/${req.body.indexname}`,"delete":`http://localhost:3000/data/${req.body.indexname}/:id`,"query":`http://localhost:3000/data/${req.body.indexname}?type=matching&jobRole=Human&name=Kristy&country=Egypt`}); */
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    searchDataIndex=async (req,res)=>{
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=10m`,
                {
                    size: 10000,
                    track_total_hits: true,
                    query: {
                        match_all: {},
                    },
                }
            )
            
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    updateData = async (req, res) => {
        try {
            
            const { filename } = req.file, { indexname } = req.body
            const sampleData = require(`../uploads/${filename}`)
            let data = ''
            Index.findOne({ userId: req.user._id,nameIndex:indexname }).exec(async (error, user) => { //check key unique
                const {keyUnique}=user;
                for (let idx = 0; idx < sampleData.length; idx++) {
                    const checkExist = await axios.post(
                        `${esUrl}${indexname}/_search`,
                        {
                            query: {
                                match: {
                                    [keyUnique]:{
                                        query: `${sampleData[idx][keyUnique]}`,
                                        operator: "and"
                                    }
                                },
                            },
                        }
                    )
                    if (checkExist.data.hits.total.value === 0) { // nếu tên người dùng chưa có thì sẽ insert
                        data =
                            data +
                            `{"index":{"_index":"${indexname}","_id" : "${shortid.generate()}"}}` +
                            '\n'
                        data = data + converData(sampleData[idx]) + '\n'
                    } else { // nếu có thì sẽ update
                        const id = checkExist.data.hits.hits[0]._id
                        data =
                            data +
                            `{"update":{"_id" : "${id}","_index":"${indexname}"}}` +
                            '\n'
                        data =
                            data + `{"doc":${converData(sampleData[idx])}}` + '\n'
                    }
                }
                const insert = await client.bulk({ body: data })
                res.status(200).json(insert)
            })
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    searchAllField = async (req, res) => {
        console.log(req.body, 'Reqbody')
        const query = {
            function_score: {
                query: {
                    match: {
                        [req.body.textfield]: req.body.input
                    }
                },
                boost: "5"
            }
        }
        
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=1h`,
                {
                    size: 10000,
                    query: query,
                }
            )
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    searchAdvanced = async (req, res) => {
        const { query, fields } = req.body
        // console.log(fields, 'fieldss')
        const tempArr = [];
        fields.map(e=>{
            if(e !== 'lyrics')
                tempArr.push(e + "^6.0")
            else
                tempArr.push(e + "^3.0")
        })
        // console.log(tempArr, 'fieldss')
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=1h`,
                {
                    size: 10000,
                    query: {
                        multi_match: {
                            query: query,
                            fields: tempArr,
                            type: "best_fields"
                        }
                    },
                }
            )
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deteleRecord = async (req, res) => {
        try {
            const response = await axios.delete(
                `${esUrl}${req.params.index}/_doc/${req.params.id}`
            )
            res.status(204).json(response);
        } catch (error) {
            res.json(error);
        }
    }
    deleteRecords = async (req, res) => {
        try {
            const response = await axios.post(
                `${esUrl}${req.params.index}/_delete_by_query`,
                {
                    query: req.body,
                }
            )
            res.status(204).json(response)
        } catch (error) {
            res.json(error)
        }
    }
    deleteIndex = async (req, res) => {
        try {
            Index.deleteOne({ nameIndex: req.params.index }).exec(
                (error, result) => {
                    if (error) return res.status(400).json({ error })
                    console.log(result)
                }
            )

            const response = await client.indices.delete({
                index: req.params.index,
            })
            res.status(204).json(response)
        } catch (error) {
            res.json(error.data)
        }
    }
    getAllIndex = async (req, res) => {
        let listIndex = ''
        const index = await Index.find({ userId: req.user._id })
            .select('nameIndex')
            .exec()
            console.log(index,'index')
        index.map(
            (item) =>
                (listIndex = listIndex + item.nameIndex.toLowerCase() + ',')
        )
        if (listIndex === '') {
            res.json([])
        }
        try {
            const response = await axios.get(
                `${esUrl}_cat/indices/${listIndex}`
            )
            const allIndex = response.data.replace(/\n/g, ' ').split(' ')
            const temp = allIndex.filter((word) => word.length > 0)
            const result = CreateIndexJson(temp)
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }
    nextPage = async (req, res) => {
        const { scroll_id } = req.body
        const response = await client.scroll({
            scroll_id: scroll_id,
            scroll: '1h',
        })
        res.json(response)
    }
}
function pagination(items, page = 1, perPage = 8) {
    const previousItem = (page - 1) * Number(perPage)
    return {
        result: {
            items: items.slice(previousItem, previousItem + Number(perPage)),
            totalPage: Math.ceil(items.length / Number(perPage)),
            currentPage: page,
            totalItem: items.length,
        },
    }
}
function converData(data) {
    return JSON.stringify(data).replace('\n', '')
}
module.exports = new UserController()
