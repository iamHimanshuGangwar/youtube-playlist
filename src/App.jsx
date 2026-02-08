import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

  const [text, setText] = useState("bollywood songs")
  const [input, setInput] = useState("")
  const [arr, setArr] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState("")


  // Fetch YouTube Data
  function getExternalData(query) {

    setLoading(true)

    axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: 'snippet',
        type: 'video',
        q: query,
        maxResults: 25,
        key: API_KEY
      }
    })
    .then(response => {

      const items = response.data.items

      setArr(items)

      // ▶️ Auto play first video
      if (items.length > 0) {
        setSelectedVideo(items[0].id.videoId)
        setSelectedTitle(items[0].snippet.title)
      }

      setLoading(false)
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
    })
  }
// 🔁 Auto Search (Debounce)
  useEffect(() => {

    if (input.trim() === "") return

    const timer = setTimeout(() => {
      setText(input)
      getExternalData(input)
    }, 500)

    return () => clearTimeout(timer)

  }, [input])


  // First Load
  useEffect(() => {
    getExternalData(text)
  }, [])



  return (
    <>
      <div className="container-fluid bg-light min-vh-100">

        {/* 🔍 Search Bar */}
        <div className="row p-3 bg-white shadow-sm sticky-top">

          <div className="col-md-6 mx-auto">

            <input
              type="text"
              className="form-control"
              placeholder="Search YouTube..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

          </div>

        </div>


        <div className="row p-3">

          {/* ▶️ Left: Video Player */}
          <div className="col-md-8">

            {
              selectedVideo && (

                <>
                  <div className="ratio ratio-16x9 mb-3">

                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                      title="YouTube Player"
                      allowFullScreen
                    />

                  </div>

                  {/* Video Title */}
                  <h5 className="fw-bold">
                    {selectedTitle}
                  </h5>

                  <hr />
                </>
              )
            }

          </div>


          {/* 📋 Right: Video List */}
          <div className="col-md-4">

            {
              loading && (
                <h5 className="text-center">
                  Loading...
                </h5>
              )
            }


            {
              !loading && arr.map((a) => {

                const isActive =
                  a.id.videoId === selectedVideo

                return (

                  <div
                    key={a.id.videoId}
                    className={`d-flex mb-3 p-2 rounded 
                      ${isActive ? "bg-secondary text-white" : "bg-white"}
                    `}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedVideo(a.id.videoId)
                      setSelectedTitle(a.snippet.title)
                    }}
                  >

                    {/* Thumbnail */}
                    <img
                      src={a.snippet.thumbnails.medium.url}
                      width="140"
                      className="rounded"
                      alt={a.snippet.title}
                    />

                    {/* Info */}
                    <div className="ms-2">

                      <p className="mb-1 fw-semibold small">
                        {a.snippet.title}
                      </p>

                      <p className="mb-0 small text-muted">
                        {a.snippet.channelTitle}
                      </p>

                    </div>

                  </div>
                )
              })
            }

          </div>

        </div>

      </div>
    </>
  )
}

export default App
