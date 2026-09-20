import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"

function DataPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getPost = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/post")
            console.log(response.data.data);
            setPosts(response.data.data)
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getPost()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/post/${id}`)
            getPost()
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Link className="btn btn-primary col-12 my-3" to="/add-post" >
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
                            <th scope="col">content</th>
                            <th scope="col">title</th>
                            <th scope="col">image</th>
                            <th scope="col">delete</th>
                            <th scope="col">edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.image ? post.image : "tidak ada gambar"}</td>
                                <td>
                                     <button className="btn btn-danger btn-sm " onClick={() => handleDelete(post.id)}>DELETE</button>
                                </td>
                                <td>
                                    <Link className="btn btn-primary btn-sm " to={`/edit-post/${post.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </>
    )
}
export default DataPosts