import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TestimonyForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    story: "",
    wantSupport: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "laen.line@gmail.com",
        subject: "Nouveau témoignage reçu",
        text: `Nom: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nTémoignage: ${form.story}\nSouhaite du soutien: ${form.wantSupport ? "Oui" : "Non"}`,
      }),
    });
    if (response.ok) {
      alert("Merci pour votre témoignage.");
      setForm({ firstName: "", lastName: "", email: "", story: "", wantSupport: false });
    } else {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Partagez votre témoignage</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Votre prénom"
            required
            className="mb-4"
          />
          <Input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Votre nom"
            required
            className="mb-4"
          />
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Votre email"
            required
            className="mb-4"
          />
          <Textarea
            name="story"
            value={form.story}
            onChange={handleChange}
            placeholder="Racontez votre expérience"
            required
            className="mb-4"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="wantSupport"
              checked={form.wantSupport}
              onChange={handleChange}
            />
            Je souhaite être contacté(e) pour du soutien
          </label>
          <Button type="submit" className="mt-4 w-full">Envoyer</Button>
        </form>
      </CardContent>
    </Card>
  );
}
