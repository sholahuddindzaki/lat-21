const prisma = require('../config/prisma')

const getAll = async (req, res) => {
    try {
        const post = await prisma.post.findMany()
        return res.status(200).json({ message: "semua data post ", data: post })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const create = async (req, res) => {
    try {
        const { title, content, image } = req.body;

        const post = await prisma.post.create({
            data: {
                title, content, image
            }
        })

        return res.status(201).json({ message: "berhasil dibuat ", data: post })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                content: content
            }
        })
        return res.status(200).json({ message: "berhasil di update ", data: post })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "post tidak di temukan" });
        }
        return res.status(400).json({ message: error.message });
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id
        const post = await prisma.post.findUnique({
            where: { id },
        })
        if (!post) {
            return res.status(404).json({ message: "post tidak di temukan" });
        }
        return res.status(200).json({ message: "success", data: post })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id
        await prisma.post.delete({
            where: { id },
        })
        return res.status(204).json({message : "post berhasil dihapus"})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "post tidak di temukan" });
        }
        return res.status(400).json({ message: error.message });
    }
}
module.exports = {
    getAll,
    create,
    update,
    getById,
    remove
}