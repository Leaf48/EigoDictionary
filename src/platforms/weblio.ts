import cheerio, { load } from "cheerio"
import axios from "axios";

async function weblio_meaning(word: string): Promise<string[] | any[]>{

    return new Promise((resolve, reject) =>{
        axios.get("https://ejje.weblio.jp/content/" + word)
            .then(res =>{
                try{
                    const $ = load(res.data)
                    // get meaning
                    let meaning: string = ""
                    meaning = $(".content-explanation").text().trim()
                    if(meaning == "") reject(`${word} was not found.`)

                    // get Noun, Adjunction etc...
                    let terms: string[] = []
                    for(let i = 0; i < $(".KnenjSub").length; i++){
                        terms.push($(".KnenjSub").eq(i).text())
                    }

                    // get sample sentences
                    let sentences: string[] = []
                    for(let i = 0; i < $(".KejjeYrHd").length; i++){
                        sentences.push($(".KejjeYrHd").eq(i).text())
                    }

                    resolve([meaning, terms, sentences])
                }catch (e){
                    reject(`${word} was not found.`)
                }
            })
            .catch(err =>{
                reject(`${word} was not found.`)
            })

    })
}


export default weblio_meaning