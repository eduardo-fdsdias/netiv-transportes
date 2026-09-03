type Testimonial = {
  name: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
}

// Adicione aqui somente avaliações reais e autorizadas.
const testimonials: Testimonial[] = []

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="section testimonials-section" aria-labelledby="avaliacoes-title">
      <div className="shell">
        <div className="section-heading">
          <span className="section-kicker">Avaliações de clientes</span>
          <h2 id="avaliacoes-title">Quem utiliza a Netiv recomenda</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(({ name, text, rating }) => (
            <article key={`${name}-${text}`}>
              <div className="testimonial-stars" aria-label={`${rating} de 5 estrelas`}>
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
              </div>
              <blockquote>“{text}”</blockquote>
              <cite>{name}</cite>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
