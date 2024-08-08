import asyncHandler from 'express-async-handler'

// @desc    Get goal
// @route   GET /api/goal
// @access Private
const getGoals = asyncHandler (async (req, res)=> {
    res.status(200).json({msg: "Get goals"})
})

// @desc    Set goal
// @route   POST /api/goal
// @access Private
const setGoals = asyncHandler (async (req, res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200).json({msg: "Set goals"})
})

// @desc    Update goal
// @route   PUT /api/goal/:id
// @access Private
const updateGoals = asyncHandler( async (req, res)=> {
    res.status(200).json({msg: `Update goals ${req.params.id}`})
})

// @desc    DELETE goal
// @route   DELETE /api/goal/:id
// @access Private
const deleteGoals = asyncHandler ( async (req, res)=> {
    res.status(200).json({msg: `Delete goals ${req.params.id}`})
})

export {getGoals, setGoals, updateGoals, deleteGoals};