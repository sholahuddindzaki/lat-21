const prisma = require('../config/prisma')

const getAll = async (req, res) => {
    try {
        const siswa = await prisma.siswa.findMany()
        return res.status(200).json({ message: "semua data siswa ", data: siswa })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const create = async (req, res) => {
    try {
        const { nama, alamat, tanggal_lahir, jurusan } = req.body;

        const siswa = await prisma.siswa.create({
            data: {
                nama: nama,
                alamat: alamat,
                tanggal_lahir: new Date(tanggal_lahir), 
                jurusan: jurusan
            }
        })

        return res.status(201).json({ message: "berhasil dibuat ", data: siswa })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params
        const { nama, alamat, tanggal_lahir, jurusan } = req.body
        const siswa = await prisma.siswa.update({
            where: {
                id: id
            },
            data: {
                nama:nama,
                alamat:alamat,
                tanggal_lahir: new Date(tanggal_lahir),  
                jurusan:jurusan
            }
        })
        return res.status(200).json({ message: "berhasil di update ", data: siswa })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "siswa tidak di temukan" });
        }
        return res.status(400).json({ message: error.message });
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id
        const siswa = await prisma.siswa.findUnique({
            where: { id },
        })
        if (!siswa) {
            return res.status(404).json({ message: "siswa tidak di temukan" });
        }
        return res.status(200).json({ message: "success", data: siswa })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id
        await prisma.siswa.delete({
            where: { id },
        })
        return res.status(204).json({message : "siswa berhasil dihapus"})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "siswa tidak di temukan" });
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