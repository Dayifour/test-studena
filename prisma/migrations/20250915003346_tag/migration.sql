/*
  Warnings:

  - You are about to drop the `_LevelToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LevelToTutor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToTutor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LevelToStudent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LevelToTutor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StudentToSubject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SubjectToTutor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_TutorSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TutorLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TutorSubjects_AB_unique" ON "_TutorSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorSubjects_B_index" ON "_TutorSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorLevels_AB_unique" ON "_TutorLevels"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorLevels_B_index" ON "_TutorLevels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentLevels_AB_unique" ON "_StudentLevels"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentLevels_B_index" ON "_StudentLevels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentSubjects_AB_unique" ON "_StudentSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentSubjects_B_index" ON "_StudentSubjects"("B");
