<template>
  <div class="container mx-auto min-h-screen p-10">
    <div class="w-1/2 mx-auto flex items-center justify-end mb-10">
      <router-link
        :to="{ name: 'events' }"
        class="px-3 py-2 text-xs rounded-sm font-semibold border bg-blue-600 text-white hover:bg-blue-700"
      >
      <i class="fa-solid fa-caret-left"></i>
        Go To Events
      </router-link>
    </div>

    <!-- Event Edit From -->
    <div class="border shadow w-1/2 mx-auto p-6 rounded-md">
      <h2 class="font-bold text-xl text-slate-600 w-full text-center mb-10">
        Edit Event
      </h2>
      <form>
        <div class="mb-6">
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
            <span class="text-red-600">*</span>
          </label>

          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a event category</option>
            <option value="education">Education</option>
            <option value="volunteering">Volunteering</option>
            <option value="community">Community</option>
            <option value="nature">Nature</option>
            <option value="animal-welfare">Animal Welfare</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
            <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your event title"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
            <span class="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your event description here..."
          ></textarea>
        </div>

        <div class="mb-6">
          <label
            for="location"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
            <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="location"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your event location"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="mb-6">
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
              <span class="text-red-600">*</span>
            </label>

            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                  />
                </svg>
              </div>
              <input
                datepicker
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="time"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time
              <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="time"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your event time ( eg. 1:03 Pm )"
              required
            />
          </div>
        </div>

        <div class="">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>