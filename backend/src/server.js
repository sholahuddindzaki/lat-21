const express = require('express');
const siswaRouter = require('./routes/siswaRouter')
const cors = require('cors');
const app = express();

app.use(cors())
const PORT = process.env.PORT || 3000
app.use(express.json());

app.use('/api/siswa',siswaRouter)
app.listen(PORT , ()=>{
 console.log(`server berjalan di http://localhost:${PORT}`);
});