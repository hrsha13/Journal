-- Add ISSN to journal_settings table if it doesn't exist
INSERT INTO journal_settings (setting_key, setting_value, created_at, updated_at)
VALUES ('issn', '3108-1053', NOW(), NOW())
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = '3108-1053',
  updated_at = NOW();

-- Add other journal metadata if needed
INSERT INTO journal_settings (setting_key, setting_value, created_at, updated_at)
VALUES 
  ('journal_name', 'SVLNS Journal', NOW(), NOW()),
  ('journal_description', 'A scholarly journal for research and publications', NOW(), NOW())
ON CONFLICT (setting_key) DO UPDATE SET
  updated_at = NOW();
