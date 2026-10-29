-- Medixis — limites du bucket d'images
-- À coller dans Supabase Dashboard → SQL Editor → New query → Run (une seule fois).
--
-- 10 Mo maximum par fichier ; photos (JPEG, PNG, WebP, AVIF) et fiches techniques PDF.
-- SVG volontairement exclu : un SVG peut contenir du script et serait servi
-- depuis le bucket public. Garder cette liste alignée avec components/admin/ImageUpload.tsx.

update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
where id = 'medixis-images';
