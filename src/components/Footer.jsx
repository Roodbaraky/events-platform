
export const Footer = (props) => {
  return (
    <footer className="self-center bg-base-100 w-full mx-auto" {...props}>
      <div className=" flex flex-col sm:flex-row w-full mx-auto max-w-screen-xl p-4 sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://portfolio.koo.codes/" target="_blank" className="hover:underline">
            RoodCode™
          </a>{" "}
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/koorosh-roodbaraky/"
              target="_blank"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
