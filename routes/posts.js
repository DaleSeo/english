const router = require('express').Router()
const postSvc = require('../services/postService')

router.get('', (req, res) => {
  postSvc.find({page: req.query.page || 1})
    .then(docs => res.send(docs))
})

router.post('', (req, res) => {
  postSvc.create(req.body)
    .then(id => res.status(201).send({id: id}))
})

router.get('/:id', (req, res) => {
  postSvc.findOne(req.params.id)
    .then(doc => res.send(doc))
})

router.put('/:id', (req, res) => {
  postSvc.modify(req.params.id, req.body)
    .then(_ => res.send({}))
})

router.delete('/:id', (req, res) => {
  postSvc.remove(req.params.id)
    .then(_ => res.send({}))
})

module.exports = router
