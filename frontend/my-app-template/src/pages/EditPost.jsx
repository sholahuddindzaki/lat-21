import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function Edit() {
    const { id } = useParams()
    const [form, setForm] = useState({
        title: "",
        content: ""
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
            const response = await axios.get(`http://localhost:4000/api/post/${id}`)
            const data = response.data.data
            setForm({
                title: data.title,
                content : data.content
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:4000/api/post/${id}`,form)
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <h1>edit data mahasiswa</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control"
                        name="title" id="floatingNama"
                        placeholder="nama"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingNama">title</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control"
                        name="content" id="floatingNama"
                        placeholder="nama"
                        value={form.content || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingNama">content</label>
                </div>
                <br />
                <button type="submit" value="submit" className="btn btn-success col-12 mt-2">submit</button>

            </form>
        </>
    )
}
export default Edit