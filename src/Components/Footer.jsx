function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="https://sheroz.pages.dev/" className="hover:underline">
               Made By Sheroz Akram
            </a>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="https://github.com/Sheroz-Akram/weather-react" className="hover:underline me-4 md:me-6">
                Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/Sheroz-Akram" className="hover:underline me-4 md:me-6">
                Github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sheroz-akram/" className="hover:underline me-4 md:me-6">
                Linkedin
              </a>
            </li>
            <li>
              <a href="https://sheroz.pages.dev/" className="hover:underline">
                Website
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
