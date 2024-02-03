import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram,FaLinkedin,FaDiscord ,FaGithub } from "react-icons/fa";

function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex  md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                {" "}
                Ajith Chakkadath
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ajith blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Ajith-Chakkadath"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal " />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Condition</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="">
            <Footer.Copyright href="#" by="Ajith chakkadath blog" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-3 mt-2 sm:justify-center">
                <Footer.Icon href="#" icon={FaInstagram}/>
                <Footer.Icon href="https://www.linkedin.com/in/ajith-chakkadath/" icon={FaLinkedin }/>
                <Footer.Icon href="https://discord.com/channels/ajithchakkadath" icon={FaDiscord}/>
                <Footer.Icon href="https://github.com/Ajith-Chakkadath" icon={FaGithub}/>
            </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
