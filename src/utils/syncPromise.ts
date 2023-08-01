export const syncPromise=(cb:Function)=>{
        return new Promise((resolve, reject) =>{
                cb(resolve,reject);
        })
}
