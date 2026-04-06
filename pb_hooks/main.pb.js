// pb_hooks/main.pb.js
onRecordEnrich((e) => {
  const record = e.record;
  const appUrl = $app.settings().meta.appURL || "http://127.0.0.1:8090";
  const collectionId = record.collection().id;
  const recordId = record.id;

  record.withCustomData(true);

  // Hero image URL
  const heroImage = record.get("hero_image");
  if (heroImage) {
    record.set(
      "hero_image_url",
      `${appUrl}/api/files/${collectionId}/${recordId}/${heroImage}`
    );
  }

  // More images URLs
  const moreImages = record.get("more_images");
  if (moreImages && moreImages.length > 0) {
    const moreImagesUrls = moreImages.map(
      (filename) =>
        `${appUrl}/api/files/${collectionId}/${recordId}/${filename}`
    );
    record.set("more_images_urls", moreImagesUrls);
  }

  e.next();
}, "work");
