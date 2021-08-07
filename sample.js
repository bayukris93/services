// merujuk express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// instansiasi obejct express dan di simpan pada konstanta app
const app = express();

// gunakan body parser sebgai middleware
app.use(bodyParser.json());
app.use(cors())

// untuk sementara kita anggap variable db ini sebagai sumber data kita
let db = [
    
    {
        nama: "sabun",
        harga_jual: "1200",
        harga_beli: "1000",
        stok: "2",
        foto: "",
      },
      {
        nama: "sampo",
        harga_jual: "1300",
        harga_beli: "1100",
        stok: "2",
        foto: "",
      },
      
      {
        nama: "gula",
        harga_jual: "1600",
        harga_beli: "1400",
        stok: "2",
        foto: "",
      },
];

// contoh routing pada express
app.get('/', (request, response) => response.send('Hello World'));

// memberikan List
app.get('/barang', (request, response) => {
    return response.json(db);
});

app.get('/barang/:nama', (request, response) => {
    const result = db.filter(val => {
        return val.nama.toLocaleLowerCase() === request.params.nama.toLocaleLowerCase();
    });
    return response.json(result);
});

// memasukan  baru
app.post('/barang', (request, response) => {
    const newbarang = {
        nama: request.body.nama,
        harga_jual: request.body.harga_jual,
        harga_beli: request.body.harga_beli,
        stok:request.body.stok,
        foto: "",
       
    };

    db.push(newbarang);
    
    return response.json(newbarang);
});

// mengubah  yang ada
app.put('/barang/:nama', (request, response) => {
    var index = -1; //0,1,2
    var val = request.params.nama.toLocaleLowerCase()
    var filteredObj = db.find(function (item, i) {
        if (item.nama === val) {
            index = i;
            console.log(index)
            const newbarang = {
                nama: request.body.nama,
                harga_jual: request.body.harga_jual,
                harga_beli: request.body.harga_beli,
                stok: request.body.stok,
                foto: request.body.foto
            };
            db[index] = newbarang
        }
    });

    const newbarang = {
        nama: request.body.nama,
        harga_jual: request.body.harga_jual,
        harga_beli: request.body.harga_beli,
        stok: request.body.stok,
        foto: request.body.foto
    };


    return response.json(newbarang);
});

// menghapus  yang ada
app.delete('/barang/:nama', (request, response) => {
    db = db.filter(val => {
        return val.nama.toLocaleLowerCase() !== request.params.nama.toLocaleLowerCase();
    });

    return response.json(db);
});

// mendengarkan event yang terjadi pada localhost dengan port 3000
app.listen(3010, () => console.log('listenig on localhos:3010'));