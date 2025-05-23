"use client"

import { motion } from "framer-motion"

export function MapSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-lg h-[400px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47565.78878935698!2d-8.855833!3d41.693055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b8b9a6b77a1d%3A0x400ebbde49036d0!2sViana%20do%20Castelo!5e0!3m2!1sen!2spt!4v1621234567890!5m2!1sen!2spt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="VianaHub Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  )
}
