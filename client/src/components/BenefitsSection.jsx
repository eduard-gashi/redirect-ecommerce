

export default function BenefitsSection() {
    return (
        <section className="benefits-section">
            <div className="benefit-row">
                <div className="benefit-text">
                    <h3 className="benefits-header">Verbindlicher 30‑Tage‑Plan</h3>
                    <p>
                        Du verpflichtest dich für 30 Tage zu klaren Grundregeln – zum Beispiel
                        das Handy abends in die Box zu legen – und schaffst so bewusst Abstand
                        vom Bildschirm.
                    </p>
                </div>
                <div className="benefit-image">
                    <img src="/images/benefits/daily_challenges.jpeg" alt="Notizblock der Detox‑Box" />
                </div>
            </div>

            <div className="benefit-row benefit-row--reverse">
                <div className="benefit-text">
                    <h3 className="benefits-header">Tägliche Challenges statt Scrollen</h3>
                    <p>
                        Die täglichen Challenges füllen deine gewonnene Zeit mit sportlichen,
                        sozialen und kreativen Aktivitäten – statt endlosem Scrollen.
                    </p>
                </div>
                <div className="benefit-image">
                    <img src="/images/benefits/daily_challenges.jpeg" alt="Tägliche Challenges" />
                </div>
            </div>

            <div className="benefit-row">
                <div className="benefit-text">
                    <h3 className="benefits-header">Reflexion & Gewohnheitstracker</h3>
                    <p>
                        Im Notizblock hältst du fest, was dir guttut, und machst es mit dem
                        Gewohnheitstracker zur Gewohnheit – für weniger Bildschirmzeit und
                        nachhaltige Routinen.
                    </p>
                </div>
                <div className="benefit-image">
                    <img src="/images/benefits/daily_challenges.jpeg" alt="Gewohnheitstracker" />
                </div>
            </div>
        </section>

    );
}