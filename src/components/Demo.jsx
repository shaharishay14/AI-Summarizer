import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'



const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: '',
    length: ''
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url, length: article.length });

    if(data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      setArticle(newArticle);

      console.log(newArticle)
    }

  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">  
        <form className="relative flex justify-center items-center">
          <img src={linkIcon} alt="link_icon"
          className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter a URL"
            onChange={(e) => setArticle({...article,
            url : e.target.value })}
            required
            className="url_input peer" 
            value={article.url}
          />
         
          
        </form>
      </div>

      <div className="flex flex-col w-full gap-2 mt-5">
        <form className="relative flex justify-center items-center"
        onSubmit={handleSubmit}>
            <input 
              type="number"
              min="1"
              max="100"
              required
              value={article.length}
              onChange={(e) => setArticle({...article, length: e.target.value})}
              className="url_input peer"
              placeholder='Enter the length of the summary (1-100)'
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-l-gray-700
              peer-focus:text-gray-700"
            >
              ⏎
            </button>
        </form>
      </div>
      
        {/* Browse URL History */}
      

      {/* Display Results */}
      <div>
        {article.summary && (
          <div className="flex flex-col gap-3">
            <h2 className="font-satoshi font-bold text-gray-600 text-xl mt-10">
              Article <span className="orange_gradient">Summary</span>
            </h2>
            <div className="summary_box">
              <p className="font-inter font-medium text-sm text-gray-700">
                {article.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Demo