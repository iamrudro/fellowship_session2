const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriberModel')
const { validateSubscriber } = require('../tests/unittest/validateInput.test');

router.post('/', async (req, res) => {
    if (!validateSubscriber(req.body)) {
        return res.status(400).json({ message: 'Invalid subscriber data' });
    }
})

//Getting all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting only one
router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Subscriber not found' });
    }

    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Creating One
router.post('/', async (req, res) => {
    const subs = new Subscriber({
        name: req.body.name,
        subedToChannel: req.body.subedToChannel
    })
    try {
        const newSubscriber = await subs.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating One
router.patch('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Subscriber not found' });
    }

    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });

        if (req.body.name !== undefined) subscriber.name = req.body.name;
        if (req.body.subedToChannel !== undefined) subscriber.subedToChannel = req.body.subedToChannel;

        const updatedSubscriber = await subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find Subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router