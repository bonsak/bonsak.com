// pb_hooks/main.pb.js
onRecordEnrich((e) => {
  const record = e.record;
  const filename = record.get("hero_image");

  if (filename) {
    const appUrl = $app.settings().meta.appURL || "http://127.0.0.1:8090";
    const collectionId = record.collection().id;
    const recordId = record.id;
    const fullUrl = `${appUrl}/api/files/${collectionId}/${recordId}/${filename}`;

    record.withCustomData(true);
    record.set("hero_image_url", fullUrl);
  }

  e.next();
}, "work");
