import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [form, setForm] = useState({
            nama: "",
            alamat: "",
            tanggal_lahir : "",
            jurusan : "" 
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    useEffect(()=>{
        post()
    },[id])
    const post = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/siswa/${id}`)
            const data = response.data.data
            setForm({
                nama: data.nama,
                alamat: data.alamat,
                tanggal_lahir: data.tanggal_lahir,
                jurusan: data.jurusan
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:3000/api/siswa/${id}`,form)
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
        navigate("/");
    }
    return (
        <>
            <h1>edit data mahasiswa</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control"
                        name="nama" id="floatingNama"
                        placeholder="nama"
                        value={form.nama}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingNama">nama</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control"
                        name="alamat" id="floatingAlamat"
                        placeholder="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingAlamat">alamat</label>
                </div>
                <br />
                  <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control"
                        name="jurusan" id="floatingJurusan"
                        placeholder="jurusan"
                        value={form.jurusan}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingJurusan">jurusan</label>
                </div>
                <br />
                 <div className="form-floating mb-3">
                        <label htmlFor="tanggal_lahir" className="form-label">tanggal lahir</label>
                        <br/>
                        <input type="date" className="form-control" 
                        id="tanggal_lahir" 
                        name="tanggal_lahir"
                        value={form.tanggal_lahir}
                        onChange={handleChange}
                        />
                    </div>
                <br />
                <button type="submit" value="submit" className="btn btn-success col-12 mt-2">submit</button>

            </form>
        </>
    )
}
export default Edit