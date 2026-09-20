import axios from "axios"
import { useState } from "react"

function AddPost() {
    const [form, setForm] = useState({
        title: "",
        content: ""
    })
    const [errors, setErrors] = useState({
        title: "",
        content: ""
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
        let newErrors = { content: "", title: "" };

        if (!form.title.trim()) {
            newErrors.title = " title wajib diisi!";
            valid = false;
        }

        if (!form.content.trim()) {
            newErrors.content = "content wajib diisi!";
            valid = false;
        }

        // Jika ada input yang kosong, simpan error ke state dan batalkan pengiriman data
        if (!valid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/post/", form)
            console.log(response);
            setForm({ title: "", content: "" })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <h1>tambah data mahasiswa</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`} // Ditambah class error Bootstrap
                        name="title"
                        id="floatingNama"
                        placeholder="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingNama">title</label>
                    {/* Tampilkan pesan error nama di bawah input */}
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input type="text"
                        className={`form-control ${errors.content ? 'is-invalid' : ''}`} // Ditambah class error Bootstrap
                        name="content"
                        id="floatingAlamat"
                        placeholder="content"
                        value={form.content}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingAlamat">content</label>
                    {/* Tampilkan pesan error alamat di bawah input */}
                    {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                </div>
                <br />
                <button type="submit" className="btn btn-success col-12 mt-2">submit</button>
            </form>
        </>
    )
}

export default AddPost