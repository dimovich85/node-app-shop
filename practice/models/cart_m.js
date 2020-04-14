const fs = require('fs');
const path = require('path');

const p = path.join(
    __dirname,
    '..',
    'data',
    'cart.json'
)

class Cart{
    static async add(course){
        const cart = await Cart.fetch();        
        const idx = cart.courses.findIndex(c => course.id === c.id);
        const candidate = cart.courses[idx];

        if( !candidate ){
            course.count = 1;
            cart.courses.push(course);
        } else{
            candidate.count++;
        }
        cart.price = (+cart.price) + (+course.price);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                p,
                JSON.stringify(cart),
                err => {
                    if(err) reject(err);
                    else resolve();
                }
            );
        });
    }
    static fetch(){
        return new Promise((resolve, reject)=>{
            fs.readFile(
                p,
                'utf-8',
                (err, content) => {
                    if(err) reject(err);
                    else resolve(JSON.parse(content));
                }
            );
        });
    }

    static async remove(id){
        const cart = await Cart.fetch();
        const idx = cart.courses.findIndex( c => c.id === id );
        cart.price = (+cart.price) - (+cart.courses[idx].price);
        if( cart.courses[idx].count > 1 ){
            cart.courses[idx].count--;
        } else{
            cart.courses.splice(idx, 1);
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                JSON.stringify(cart),
                (err) => {
                    if( err ) {
                        reject(err);
                    } else{
                        resolve(cart);
                    }
                }
            );
        });
    }
}

module.exports = Cart;