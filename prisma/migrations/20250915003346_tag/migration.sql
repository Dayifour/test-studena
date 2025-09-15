/*
    Warnings:

    - You are about to drop legacy join tables if they exist.
*/
-- DropTable (only if exists)
PRAGMA foreign_keys=off;
DROP TABLE IF EXISTS "_LevelToStudent";
DROP TABLE IF EXISTS "_LevelToTutor";
DROP TABLE IF EXISTS "_StudentToSubject";
DROP TABLE IF EXISTS "_SubjectToTutor";
PRAGMA foreign_keys=on;

-- CreateTable (idempotent)
CREATE TABLE IF NOT EXISTS "_TutorSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable (idempotent)
CREATE TABLE IF NOT EXISTS "_TutorLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable (idempotent)
CREATE TABLE IF NOT EXISTS "_StudentLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable (idempotent)
CREATE TABLE IF NOT EXISTS "_StudentSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "_TutorSubjects_AB_unique" ON "_TutorSubjects"("A", "B");

-- CreateIndex (idempotent)
CREATE INDEX IF NOT EXISTS "_TutorSubjects_B_index" ON "_TutorSubjects"("B");

-- CreateIndex (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "_TutorLevels_AB_unique" ON "_TutorLevels"("A", "B");

-- CreateIndex (idempotent)
CREATE INDEX IF NOT EXISTS "_TutorLevels_B_index" ON "_TutorLevels"("B");

-- CreateIndex (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "_StudentLevels_AB_unique" ON "_StudentLevels"("A", "B");

-- CreateIndex (idempotent)
CREATE INDEX IF NOT EXISTS "_StudentLevels_B_index" ON "_StudentLevels"("B");

-- CreateIndex (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "_StudentSubjects_AB_unique" ON "_StudentSubjects"("A", "B");

-- CreateIndex (idempotent)
CREATE INDEX IF NOT EXISTS "_StudentSubjects_B_index" ON "_StudentSubjects"("B");
