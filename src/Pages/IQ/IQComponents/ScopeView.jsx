function ScopeView({data}) {
	return (
		<div>
			 <section class="text-blueGray-700 ">
            <div class="container flex flex-col items-center px-5 py-8 mx-auto">
              <div class="flex flex-col w-full mb-12 text-left ">
                <div class="w-full mx-auto lg:w-1/2">
                  <h2 class="mx-auto mb-6 text-xl font-semibold leading-none tracking-tighter text-black title-font"> {data.desc} </h2>
                  </div>
              </div>
            </div>
          </section>
        
		</div>
	)
}

export default ScopeView
