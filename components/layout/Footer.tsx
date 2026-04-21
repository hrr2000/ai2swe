import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = {
  Learn: [
    { href: "/tutorials", label: "All Tutorials" },
    { href: "/tutorials#module-0", label: "Start Here" },
    { href: "/tutorials#module-4", label: "Transformers" },
    { href: "/tutorials#module-5", label: "LLMs" },
    { href: "/tutorials#module-9", label: "Build with AI" },
  ],
  Blog: [
    { href: "/blog", label: "All Posts" },
    { href: "/blog?category=model-releases", label: "Model Releases" },
    { href: "/blog?category=tools-and-frameworks", label: "Tools & Frameworks" },
    { href: "/blog?category=research-simplified", label: "Research Simplified" },
  ],
  Site: [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
    { href: "/feed.xml", label: "RSS Feed" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>
              ai<span className={styles.logoAccent}>2swe</span>
            </span>
          </Link>
          <p className={styles.tagline}>
            AI concepts explained for software engineers.
            <br />
            No math. Just code.
          </p>
          <p className={styles.copyright}>
            © 2026 ai2swe
          </p>
        </div>

        <div className={styles.links}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>{section}</h3>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>
          Built for developers, by developers.
        </p>
      </div>
    </footer>
  );
}
