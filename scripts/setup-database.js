const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

async function setupDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGODB_DB_NAME || "mydb";
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected successfully to server");

    const db = client.db(dbName);

    const collections = [
      "users",
      "testimonials",
      "projects",
      "services",
      "about",
      "settings",
      "messages",
      "ads", // Nova collection para anúncios
      "pages", // Nova collection para páginas
      "menus", // Nova collection para menus
      "site_settings", // Nova collection para configurações do site
    ];

    for (const collectionName of collections) {
      const collectionExists = await db
        .listCollections({ name: collectionName })
        .next();
      if (!collectionExists) {
        await db.createCollection(collectionName);
        console.log(`✅ Collection "${collectionName}" created`);
      } else {
        console.log(`✅ Collection "${collectionName}" already exists`);
      }
    }

    // Criar usuário admin se não existir
    const adminUser = await db
      .collection("users")
      .findOne({ username: adminUsername });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await db.collection("users").insertOne({
        username: adminUsername,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin user already exists");
    }

    // Inserir configurações iniciais do site
    await db.collection("site_settings").insertOne({
      siteName: "VianaHub",
      siteDescription: "Soluções tecnológicas inovadoras",
      contactEmail: "contato@vianahub.com",
      contactPhone: "+351 123 456 789",
      address: "Lisboa, Portugal",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
      },
      seo: {
        metaTitle: "VianaHub - Soluções Tecnológicas",
        metaDescription:
          "Desenvolvemos soluções tecnológicas inovadoras para o seu negócio",
        keywords: "tecnologia, desenvolvimento, soluções",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Inserir menu principal
    await db.collection("menus").insertOne({
      name: "Menu Principal",
      location: "header",
      items: [
        { label: "Início", url: "/", order: 1 },
        { label: "Sobre", url: "/sobre", order: 2 },
        { label: "Serviços", url: "/servicos", order: 3 },
        { label: "Contato", url: "/contacto", order: 4 },
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Configurações iniciais do site criadas");
    console.log("✅ Menu principal criado");
  } catch (err) {
    console.error("❌ Error setting up database:", err);
  } finally {
    await client.close();
    console.log("✅ Connection closed");
  }
}

setupDatabase();
