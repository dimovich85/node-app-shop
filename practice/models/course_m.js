const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course{
    constructor(title, price, img){
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

    async save(){
        const courses = await Course.getAll();
        courses.push({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        });
        return new Promise( (resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if( err ) {
                        reject(err);
                    } else{
                        resolve();
                    }
                }
            );
        });
    }

    static async update(id, data){
        const courses = await Course.getAll();
        const idx = courses.findIndex(course => course.id === id);
        courses[idx] = data;
        return new Promise( (resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if( err ) {
                        reject(err);
                    } else{
                        resolve();
                    }
                }
            );
        });
    }

    static getAll(){
        return new Promise((res, rej)=>{
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if( err ){
                        rej(err)
                    } else{
                        res(JSON.parse(content));
                    }
                }
            );
        });
    }

    static async getById(id){
        const courses = await Course.getAll();
        return courses.find( course => course.id === id );
    }

}

module.exports = Course;