import { buildWhatsAppMessage, formatCalendarDate } from '../src/utils/whatsappMessage.ts';
import { PROPERTY } from '../src/content/property.ts';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertStrictEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Expected "${expected}", but got "${actual}". ${message || ''}`);
  }
}

console.log('=== RUNNING WHATSAPP HANDOFF UNIT TESTS ===\n');

// Test 1: Date formatting in en-IN (exact "Fri, 6 Nov 2026")
{
  const formatted = formatCalendarDate('2026-11-06');
  console.log(`[Test 1] Date formatting: '2026-11-06' -> "${formatted}"`);
  assertStrictEqual(formatted, 'Fri, 6 Nov 2026', 'Exact calendar format without commas or timezone shift');
}

// Test 2: Standard valid enquiry
{
  const result = buildWhatsAppMessage({
    fullName: 'David Geo',
    phone: '9629668800',
    email: 'david@example.com',
    checkInDate: '2026-11-06',
    checkOutDate: '2026-11-07',
    guests: 4,
    purposeOfVisit: 'Family Stay',
    message: 'Looking forward to our stay.',
  });

  console.log('\n[Test 2] Standard valid enquiry:');
  console.log(result.message);
  console.log('\nURL:', result.url);

  assert(result.message.includes('Name: David Geo'), 'Includes name');
  assert(result.message.includes('Phone: 9629668800'), 'Includes phone');
  assert(result.message.includes('Email: david@example.com'), 'Includes email');
  assert(result.message.includes('Check-in: Fri, 6 Nov 2026'), 'Includes check-in date');
  assert(result.message.includes('Check-out: Sat, 7 Nov 2026'), 'Includes check-out date');
  assert(result.message.includes('Package: ₹7,500 for a 24-hour stay (entire villa)'), 'Includes approved package line');
  assert(result.url.startsWith(`https://wa.me/${PROPERTY.whatsappNumber}?text=`), 'Correct wa.me URL structure');
  assertStrictEqual(result.wasMessageTruncated, false, 'Should not be truncated');

  // Verify round-trip decoding
  const urlParam = result.url.split('?text=')[1];
  const decoded = decodeURIComponent(urlParam);
  assertStrictEqual(decoded, result.message, 'Round trip decoding must match exact message text');
}

// Test 3: Empty email and empty message
{
  const result = buildWhatsAppMessage({
    fullName: 'Priya Raman',
    phone: '9876543210',
    email: '',
    checkInDate: '2026-12-10',
    checkOutDate: '2026-12-11',
    guests: 2,
    purposeOfVisit: 'Vacation',
    message: '',
  });

  console.log('\n[Test 3] Empty email and message:');
  assert(result.message.includes('Email: Not provided'), 'Email should fallback to Not provided');
  assert(result.message.includes('Message: None'), 'Message should fallback to None');
  assertStrictEqual(result.wasMessageTruncated, false);
}

// Test 4: Special characters (&, #, +, %, quotes, line breaks, Tamil Unicode)
{
  const specialMessage = 'Special & Important #1:\n100% confirmed + "luxury" room.\nவணக்கம் மற்றும் நன்றி!';
  const result = buildWhatsAppMessage({
    fullName: 'செல்வம் & Kanna',
    phone: '9123456789',
    email: 'test+booking@example.com',
    checkInDate: '2026-11-20',
    checkOutDate: '2026-11-22',
    guests: 6,
    purposeOfVisit: 'Celebration & Birthday #30',
    message: specialMessage,
  });

  console.log('\n[Test 4] Special characters & Tamil Unicode round-trip:');
  const urlParam = result.url.split('?text=')[1];
  const decoded = decodeURIComponent(urlParam);
  assertStrictEqual(decoded, result.message, 'Special characters and Tamil Unicode must survive round-trip');
  assert(result.message.includes('வணக்கம் மற்றும் நன்றி!'), 'Tamil Unicode preserved');
  assert(result.message.includes('Special & Important #1:'), 'Special chars preserved');
}

// Test 5: 600-character message truncated to 500
{
  const longText = 'A'.repeat(600);
  const result = buildWhatsAppMessage({
    fullName: 'Guest',
    phone: '9629668800',
    checkInDate: '2026-11-06',
    checkOutDate: '2026-11-07',
    guests: 4,
    purposeOfVisit: 'Stay',
    message: longText,
  });

  console.log('\n[Test 5] Message truncation check:');
  assertStrictEqual(result.wasMessageTruncated, true, 'Flag wasMessageTruncated must be true');
  const messageLine = result.message.split('\n').find((l) => l.startsWith('Message: '));
  const truncatedContent = messageLine.replace('Message: ', '');
  assertStrictEqual(truncatedContent.length, 500, 'Truncated message content must be exactly 500 characters');
  assert(result.url.length < 1800, `URL length (${result.url.length}) should remain well under 1800 chars`);
}

console.log('\n✓ ALL UNIT TESTS PASSED SUCCESSFULLY!\n');
