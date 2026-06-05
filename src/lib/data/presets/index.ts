import type { Preset } from './types';
import { minimalist } from './minimalist';
import { standard } from './standard';
import { timeBlocker } from './time-blocker';
import { mindfulReflection } from './mindful-reflection';
import { theStudent } from './the-student';
import { softwareEngineer } from './software-engineer';
import { professional } from './professional';
import { quarterlyStrategist } from './quarterly-strategist';
import { adhdPro } from './adhd-pro';
import { bulletJournal } from './bullet-journal';
import { healthFitness } from './health-fitness';
import { authorSetup } from './author-setup';
import { astrologer } from './astrologer';
import { greenThumb } from './green-thumb';
import { contentCreator } from './content-creator';
import { freelancer } from './freelancer';
import { wellnessMaster } from './wellness-master';
import { theLifelongLearner } from './the-lifelong-learner';
import { sideQuestChampion } from './side-quest-champion';
import { relationshipBuilder } from './relationship-builder';
import { homemaker } from './homemaker';
import { dailyStoic } from './daily-stoic';
import { travelNomad } from './travel-nomad';
import { parentFamily } from './parent-family';
import { musicProducer } from './music-producer';
import { bookClub } from './book-club';
import { financialPlanner } from './financial-planner';
import { weddingPlanner } from './wedding-planner';
import { marathonTrainer } from './marathon-trainer';
import { teacherEducator } from './teacher-educator';
import { realEstateAgent } from './real-estate-agent';
import { creativeWriter } from './creative-writer';
import { theLinguist } from './the-linguist';
import { meditationZen } from './meditation-zen';
import { dndGameMaster } from './dnd-game-master';
import { salesPipeline } from './sales-pipeline';
import { prayerDevotion } from './prayer-devotion';
import { socialMediaManager } from './social-media-manager';
import { gratitude365 } from './gratitude-365';
import { habitArchitect } from './habit-architect';
import { dreamweaver } from './dreamweaver';

export const PRESETS: Preset[] = [
	adhdPro,
	astrologer,
	authorSetup,
	bookClub,
	bulletJournal,
	contentCreator,
	creativeWriter,
	dailyStoic,
	dndGameMaster,
	dreamweaver,
	financialPlanner,
	freelancer,
	gratitude365,
	greenThumb,
	habitArchitect,
	healthFitness,
	homemaker,
	marathonTrainer,
	meditationZen,
	mindfulReflection,
	minimalist,
	musicProducer,
	parentFamily,
	prayerDevotion,
	professional,
	quarterlyStrategist,
	realEstateAgent,
	relationshipBuilder,
	salesPipeline,
	sideQuestChampion,
	socialMediaManager,
	softwareEngineer,
	standard,
	teacherEducator,
	theLifelongLearner,
	theLinguist,
	theStudent,
	timeBlocker,
	travelNomad,
	weddingPlanner,
	wellnessMaster,
].sort((a, b) => a.name.localeCompare(b.name));

export * from './types';
export * from './themes';
