// pb_hooks/main.pb.js

// Work collection - legger til hero_image_url og more_images_urls
onRecordEnrich(function (e) {
  var record = e.record;
  var appUrl = $app.settings().meta.appURL || "http://127.0.0.1:8090";
  var collectionId = record.collection().id;
  var recordId = record.id;

  var heroImage = record.get("hero_image");
  var moreImages = record.get("more_images");

  if (heroImage || (moreImages && moreImages.length > 0)) {
    record.withCustomData(true);

    if (heroImage) {
      record.set(
        "hero_image_url",
        appUrl + "/api/files/" + collectionId + "/" + recordId + "/" + heroImage
      );
    }

    if (moreImages && moreImages.length > 0) {
      var urls = [];
      for (var i = 0; i < moreImages.length; i++) {
        urls.push(
          appUrl +
            "/api/files/" +
            collectionId +
            "/" +
            recordId +
            "/" +
            moreImages[i]
        );
      }
      record.set("more_images_urls", urls);
    }
  }

  e.next();
}, "work");

// Timeline collection - legger til timeline_hero_url
onRecordEnrich(function (e) {
  var record = e.record;
  var timelineHero = record.get("timeline_hero");

  if (timelineHero) {
    var appUrl = $app.settings().meta.appURL || "http://127.0.0.1:8090";
    var collectionId = record.collection().id;
    var recordId = record.id;

    record.withCustomData(true);
    record.set(
      "timeline_hero_url",
      appUrl +
        "/api/files/" +
        collectionId +
        "/" +
        recordId +
        "/" +
        timelineHero
    );
  }

  e.next();
}, "timeline");
