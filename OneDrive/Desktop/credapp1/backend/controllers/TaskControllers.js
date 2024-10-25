const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find(); // Fetch all tasks
        res.status(200).send(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

module.exports.saveTask = async (req, res) => {
    const { task } = req.body;
    try {
        const newTask = await TaskModel.create({ task });
        console.log("Saved Successfully...");
        res.status(201).send(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { task }, { new: true });
        if (!updatedTask) return res.status(404).send({ msg: "Task not found!" });
        res.send("Updated Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).send({ msg: "Task not found!" });
        res.send("Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
};
