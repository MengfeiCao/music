export default {
    initSinger(list){
        // console.log(list);
        let obj = {
            "hot" : {
                tit : "热",
                items : [
                    // {
                    //     name : "薛之谦",
                    //     pic : "XXX"
                    // },
                    // {
                    //     name : "娃哈哈",
                    //     pic : "XXX"
                    // },
                ]
            }
        };

    let num = 0;
    // 先遍历获取的数据
    list.forEach(element => {
        num ++ ;
        // 将前20个数据作为hot数据
        if(num <= 20){
            obj["hot"].items.push({
                name : element.Fsinger_name,
                avator : `https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                Fsinger_mid : element.Fsinger_mid
            })
        };
        // 例如obj["A"],如果存在的话，直接在items下push进去
        if(obj[element.Findex]){
            obj[element.Findex].items.push({
                // Findex : element.Findex ,
                name : element.Fsinger_name,
                avator : `https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                Fsinger_mid : element.Fsinger_mid
            });
        
        }else{
            // 如果不存在，先创建tit为这个的，items为空的对象
            obj[element.Findex] = {
                tit : element.Findex ,
                items : []
            }
            // 然后再在items下push数据
            obj[element.Findex].items.push({
                // Findex : element.Findex ,
                name : element.Fsinger_name,
                avator : `https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                Fsinger_mid : element.Fsinger_mid
            })
            
        }
    });
    console.log(obj);
    // 遍历得到的obj对象，排除9开头的，并将其转换成数组
    let hot = [];
    let arr = [];
    for (const key in obj) {
        if (key != 9) {
            if(key == "hot"){
                hot.push(obj[key]);
            }else{
                arr.push(obj[key]) ;
            }
        }
    }
    
    // 将arr数组进行排序
    arr.sort((a,b)=>{
        return a.tit.charCodeAt() - b.tit.charCodeAt();
    })

    // 将hot数组和arr数组进行拼接，最后结果为this.singlist
    return hot.concat(arr);
    }
}