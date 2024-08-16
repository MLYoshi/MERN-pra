import asyncHandler from 'express-async-handler'
import Goal from '../models/goalModel.js'

// @desc    Get goal
// @route   GET /api/goal
// @access Private
const getGoals = asyncHandler (async (req, res)=> {
    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goal
// @access Private
const setGoals = asyncHandler (async (req, res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create(
        {
            text: req.body.text,
            user: req.user.id
        }
    )
    
    res.status(200).json({msg: goal})
})

// @desc    Update goal
// @route   PUT /api/goal/:id
// @access Private
const updateGoals = asyncHandler( async (req, res)=> {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error("not find to update")
    }

    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not authorized user")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body, {new: true}
    )

    res.status(200).json({msg: updatedGoal})
})

// @desc    DELETE goal
// @route   DELETE /api/goal/:id
// @access Private
const deleteGoals = asyncHandler ( async (req, res)=> {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error("not find to delete")
    }

    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not authorized user")
    }

    const deletedGoals = await Goal.findOneAndDelete({_id: req.params.id})

    res.status(200).json(deletedGoals)
})

export {getGoals, setGoals, updateGoals, deleteGoals};