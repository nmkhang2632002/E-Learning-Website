import styles from "./team.module.css";

export default function Team() {
  const teamMembers = [
    {
      name: "Ngo Anh Tri",
      role: "Chief Commercial Officer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731503705/yghb2vgillxdgdvm8oej.jpg",
    },
    {
      name: "Ngo Minh Khang",
      role: "Chief Technological Officer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731504398/skqarosrjcip0oghdavb.jpg",
    },
    {
      name: "Vu Tri Toan",
      role: "Back-end Developer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731504442/qrm9gr6cz74khutwlipg.jpg",
    },
    {
      name: "Dinh Nhat Nam",
      role: "Chief Executive Officer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731503877/123187023_140203614476643_3939955748519357416_n.jpg_ocz5td.jpg",
    },
    {
      name: "Trinh Quan Vuong",
      role: "Chief Financial Officer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731504958/xz4lpdpq3df2ru20uynf.jpg",
    },
    {
      name: "Nguyen Huu Dang Truong",
      role: "Front-end Developer",
      image:
        "https://res.cloudinary.com/dkyv1vp1c/image/upload/v1731505902/peq6fctqaeiuzqn9z79n.png",
    },
  ];

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Team Members</span>
          <h2 className={styles.title}>Meet Our Team</h2>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.imageWrapper}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
