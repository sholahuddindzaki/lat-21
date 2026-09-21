import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router";

function AddSiswa() {
      const navigate = useNavigate();
    const [form, setForm] = useState({
        nama: "",
        alamat: "",
        tanggal_lahir : "",
        jurusan : ""
    })
    const [errors, setErrors] = useState({
        nama: "",
        alamat: "",
        tanggal_lahir : "",
        jurusan : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((pervForm) => ({
            ...pervForm,
            [name]: value
        }))
        if (value.trim() !== "") {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // 2. LOGIC VALIDASI: Cek apakah ada inputan yang kosong sebelum kirim ke API
        let valid = true;
        let newErrors = {   
            nama: "",
            alamat: "",
            tanggal_lahir : "",
            jurusan : "" 
        };

        if (!form.nama.trim()) {
            newErrors.nama = " nama wajib diisi!";
            valid = false;
        }

        if (!form.alamat.trim()) {
            newErrors.alamat = "alamat wajib diisi!";
            valid = false;
        }
        if (!form.tanggal_lahir.trim()) {
            newErrors.tanggal_lahir = "tanggal lahir wajib diisi!";
            valid = false;
        }
         if (!form.jurusan.trim()) {
            newErrors.jurusan = "jurusan wajib diisi!";
            valid = false;
        }
        // Jika ada input yang kosong, simpan error ke state dan batalkan pengiriman data
        if (!valid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/siswa", form)
            console.log(response);
            setForm({  
                nama: "",
                alamat: "",
                tanggal_lahir : "",
                jurusan : "" 
            })
        } catch (error) {
            console.log(error.message);
        }
          navigate("/");
    }
    return (
        <>
            <h1>tambah data mahasiswa</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text"
                        className={`form-control ${errors.nama ? 'is-invalid' : ''}`} // Ditambah class error Bootstrap
                        name="nama"
                        id="floatingNama"
                        placeholder="nama"
                        value={form.nama}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingNama">nama</label>
                    {/* Tampilkan pesan error nama di bawah input */}
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input type="text"
                        className={`form-control ${errors.alamat ? 'is-invalid' : ''}`} // Ditambah class error Bootstrap
                        name="alamat"
                        id="floatingAlamat"
                        placeholder="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingAlamat">alamat</label>
                    {/* Tampilkan pesan error alamat di bawah input */}
                    {errors.alamat && <div className="invalid-feedback">{errors.alamat}</div>}
                </div>
                 <div className="form-floating mb-3">
                    <input type="text"
                        className={`form-control ${errors.jurusan ? 'is-invalid' : ''}`} // Ditambah class error Bootstrap
                        name="jurusan"
                        id="floatingJurusan"
                        placeholder="jurusan"
                        value={form.jurusan}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingJurusan">jurusan</label>
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
                    {/* Tampilkan pesan error jurusan di bawah input */}
                    {errors.jurusan && <div className="invalid-feedback">{errors.jurusan}</div>}
                    </div>
                <br />
                <button type="submit" className="btn btn-success col-12 mt-2">submit</button>
            </form>
        </>
    )
}

export default AddSiswa