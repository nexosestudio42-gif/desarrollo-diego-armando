import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext.jsx'
import { SectionHeading } from './Services.jsx'

const initialForm = { name: '', email: '', projectType: 'Sitio corporativo', message: '' }

export default function Contact() {
  const { content } = useContent()
  const { brand } = content
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Cuéntame tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Ingresa un correo válido.'
    if (!form.message.trim()) next.message = 'Cuéntame brevemente tu proyecto.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Aquí puedes conectar un backend, un servicio de formularios (Formspree, Resend, etc.)
    // o enviar el mensaje directamente por WhatsApp:
    const text = encodeURIComponent(
      `Hola Diego, soy ${form.name}. Quiero cotizar: ${form.projectType}. ${form.message}`
    )
    window.open(`https://wa.me/${brand.whatsapp}?text=${text}`, '_blank')
    setSent(true)
    setForm(initialForm)
  }

  return (
    <section id="contacto" className="section-pad">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="// 06 contacto"
              title="Hablemos de tu proyecto"
              description="Cuéntame qué necesitas y te responderé con una propuesta clara, con alcance y tiempos definidos."
            />

            <div className="mt-10 space-y-5">
              <ContactItem icon={Mail} label="Correo" value={brand.email} href={`mailto:${brand.email}`} />
              <ContactItem
                icon={MessageCircle}
                label="WhatsApp"
                value={brand.phone}
                href={`https://wa.me/${brand.whatsapp}`}
              />
              <a
  href="https://paypal.me/DiegoRamirez648"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary inline-flex items-center justify-center"
>
  💳 Pagar con PayPal
</a>
              <ContactItem icon={MapPin} label="Ubicación" value={brand.location} />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="card"
            noValidate
          >
            {sent && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 size={16} />
                ¡Gracias! Se abrió WhatsApp para enviar tu mensaje.
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" name="name" value={form.name} onChange={handleChange} error={errors.name} />
              <Field
                label="Correo"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-ink">Tipo de proyecto</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500"
              >
                <option>Sitio corporativo</option>
                <option>Tienda online</option>
                <option>Web para club deportivo</option>
                <option>Landing page</option>
                <option>Panel de administración</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-ink">Cuéntame tu proyecto</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Ej: necesito una página para mi negocio de..."
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 ${
                  errors.message ? 'border-red-300' : 'border-line'
                }`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button type="submit" className="btn-primary mt-6 w-full">
              Enviar por WhatsApp
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, type = 'text', error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 ${
          error ? 'border-red-300' : 'border-line'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl2 border border-line p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-ink">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  )
}
