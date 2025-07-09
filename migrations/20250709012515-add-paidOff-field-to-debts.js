export async function up(db, client) {
  // Example: Add "paid_off" field to all debts with default false
  await db.collection('debts').updateMany(
    { paid_off: { $exists: false } },
    { $set: { paid_off: false } }
  );
}
export async function down(db, client) {
  // Remove the field if you want to rollback
  await db.collection('debts').updateMany(
    {},
    { $unset: { paid_off: "" } }
  );
}
