import { Typography } from "@material-ui/core"


const Settings = () => {

    return (
                                       
         <section className="text-gray-700 ">
           
            <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
              <Typography align='center' variant='h2'><b>Settings</b></Typography>
                <div className="flex flex-wrap text-center">
                    <div className="px-8 py-6 lg:px-24 lg:w-2/4 md:w-full">
                      
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-blue-800 bg-gray-200 rounded-full">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                height="18" fill="currentColor">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM11 13H4v6h7v-6zm9 0h-7v6h7v-6zm-9-8H4v6h7V5zm9 0h-7v6h7V5z" />
                            </svg>
                        </div>
                        <h2 className="mb-3 text-lg font-medium text-gray-700 title-font">Version : 1.0.2</h2>
                        <p className="mb-4 text-base leading-relaxed">The following product is in it's early version of 1.0.2</p>
                        <a href="/"
                            className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 ">
                            Head to Dashboard
                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"
                                height="20" fill="currentColor">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                                </svg>
                        </a>
                    </div>
                    <div className="px-8 py-6 lg:px-24 lg:w-2/4 md:w-full">
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-blue-800 bg-gray-200 rounded-full">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                height="18" fill="currentColor">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M14 10h-4v4h4v-4zm2 0v4h3v-4h-3zm-2 9v-3h-4v3h4zm2 0h3v-3h-3v3zM14 5h-4v3h4V5zm2 0v3h3V5h-3zm-8 5H5v4h3v-4zm0 9v-3H5v3h3zM8 5H5v3h3V5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                            </svg>
                        </div>
                        <h2 className="mb-3 text-lg font-medium text-gray-700 title-font">About </h2>
                        <p className="mb-4 text-base leading-relaxed">This is the web application (LyoIMS) as an enterprise product.The product is made using React and powered by Firebase</p>
                        {/* <a href="#"
                            className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 ">
                            Learn More
                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"
                                height="20" fill="currentColor">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                                </svg>
                        </a> */}
                    </div>
                </div>
            </div>
        </section>
                                     
                                    
       
    )
}

export default Settings
