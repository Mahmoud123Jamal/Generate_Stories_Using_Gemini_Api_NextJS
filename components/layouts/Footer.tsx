function Footer() {
  return (
    <>
      <footer className="bg-orange-300 text-orange-800 p-6 text-center shadow-2xl border-t-2 border-orange-700">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Stories Generator. All rights
          reserved.
        </p>

        <p className="text-xs mt-1 opacity-75">
          Developed and Maintained by **ENG/Mahmoud Jamal**
        </p>
      </footer>
    </>
  );
}

export default Footer;
