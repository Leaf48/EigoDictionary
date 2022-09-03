import cheerio, { load } from "cheerio"
import axios from "axios";

async function weblio_meaning(word: string): Promise<string>{

    return new Promise((resolve, reject) =>{
        axios.get("https://ejje.weblio.jp/content/" + word)
            .then(res =>{
                try{
                    const $ = load(res.data)
                    const meaning = $(".content-explanation").text().trim()
                    // console.log(meaning)
                    resolve(meaning)
                }catch (e){
                    console.log(e)
                    reject()
                }
            })
            .catch(err =>{
                console.log(err)
                console.log("era-")
                reject()
            })

    })
}


export default weblio_meaning