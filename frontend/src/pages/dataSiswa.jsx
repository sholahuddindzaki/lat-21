import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"

function DataSiswa() {
    const [siswa, setSiswa] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getSiswa = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/siswa")
            console.log(response.data.data);
            setSiswa(response.data.data)
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getSiswa()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/siswa/${id}`)
            getSiswa()
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Link className="btn btn-primary col-12 my-3" to="/add-siswa" >
                tambah
            </Link>
            {loading && (
                <div className=" d-flex justify-content-center align-items-center vh-100" role="status">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {error && (
                setError(error.message)
            )}
            {!loading && !error && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">nama</th>
                            <th scope="col">alamat</th>
                            <th scope="col">tanggal lahir</th>
                            <th scope="col">jurusan</th>
                            <th scope="col">delete</th>
                            <th scope="col">edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((siswa) => (
                            <tr key={siswa.id}>
                                <td>{siswa.id}</td>
                                <td>{siswa.nama}</td>
                                <td>{siswa.alamat}</td>
                                <td>{siswa.tanggal_lahir ? new Date(siswa.tanggal_lahir).toLocaleDateString('id-ID') : '-'}</td>
                                <td>{siswa.jurusan}</td>

                                <td>
                                     <button className="btn btn-danger btn-sm " onClick={() => handleDelete(siswa.id)}>DELETE</button>
                                </td>
                                <td>
                                    <Link className="btn btn-primary btn-sm " to={`/edit-siswa/${siswa.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </>
    )
}
export default DataSiswa