/**
 * Dataset Validation Script
 *
 * Validates destinations.json and transportConnections.json against PRD v1.3 schema requirements
 *
 * Run with: npx tsx scripts/validate-dataset.ts
 */

import destinationsData from '../src/data/destinations.json';
import transportData from '../src/data/transportConnections.json';

// Allowed enum values from PRD v1.3
const ALLOWED_VALUES = {
  primary_cluster: ['urban_modern', 'historical_cultural', 'natural_scenic', 'rural_traditional'],
  transport_hub_tier: ['major', 'regional', 'remote'],
  seasons: ['spring', 'summer', 'fall', 'winter'],
  weather_risk_level: ['low', 'moderate', 'high'],
  crowd_level: ['low', 'moderate', 'high', 'very_high'],
  role_options: ['anchor', 'culture', 'nature', 'recovery', 'contrast'],
  planning_effort_level: ['Low', 'Medium', 'High'],
  transport_mode: ['high_speed_rail', 'flight', 'train', 'bus'],
  comfort_level: ['high', 'moderate', 'low'],
};

// 12 predefined interest options from PRD v1.3
const VALID_INTERESTS = [
  'Ancient History & Culture',
  'Modern Architecture & City Life',
  'Natural Landscapes & Hiking',
  'Food & Culinary Experiences',
  'Traditional Arts & Crafts',
  'Religious & Spiritual Sites',
  'Ethnic Minorities & Local Culture',
  'Photography & Scenic Views',
  'Shopping & Markets',
  'Nightlife & Entertainment',
  'Museums & Exhibitions',
  'Adventure & Outdoor Activities',
];

interface ValidationError {
  type: 'error' | 'warning';
  destination?: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];

// Validate Destinations
console.log('🔍 Validating destinations.json...\n');

const destinations = destinationsData.destinations;
const destinationIds = new Set<string>();

destinations.forEach((dest: any, index: number) => {
  const name = dest.name || `Destination ${index + 1}`;

  // Required fields check
  const requiredFields = [
    'destination_id', 'name', 'name_cn', 'interest_tags', 'primary_cluster',
    'min_recommended_stay_days', 'transport_hub_tier', 'best_seasons',
    'weather_risk_level', 'crowd_level', 'role_options', 'base_description',
    'planning_effort_level', 'image_url'
  ];

  requiredFields.forEach(field => {
    if (!(field in dest)) {
      errors.push({
        type: 'error',
        destination: name,
        field,
        message: `Missing required field: ${field}`
      });
    }
  });

  // Validate destination_id uniqueness
  if (dest.destination_id) {
    if (destinationIds.has(dest.destination_id)) {
      errors.push({
        type: 'error',
        destination: name,
        field: 'destination_id',
        message: `Duplicate destination_id: ${dest.destination_id}`
      });
    }
    destinationIds.add(dest.destination_id);
  }

  // Validate interest_tags
  if (dest.interest_tags) {
    if (!Array.isArray(dest.interest_tags)) {
      errors.push({
        type: 'error',
        destination: name,
        field: 'interest_tags',
        message: 'interest_tags must be an array'
      });
    } else {
      if (dest.interest_tags.length < 1 || dest.interest_tags.length > 5) {
        errors.push({
          type: 'warning',
          destination: name,
          field: 'interest_tags',
          message: `interest_tags should have 1-5 items, has ${dest.interest_tags.length}`
        });
      }
      dest.interest_tags.forEach((tag: string) => {
        if (!VALID_INTERESTS.includes(tag)) {
          errors.push({
            type: 'error',
            destination: name,
            field: 'interest_tags',
            message: `Invalid interest tag: "${tag}". Must be one of the 12 predefined options.`
          });
        }
      });
    }
  }

  // Validate enum fields
  if (dest.primary_cluster && !ALLOWED_VALUES.primary_cluster.includes(dest.primary_cluster)) {
    errors.push({
      type: 'error',
      destination: name,
      field: 'primary_cluster',
      message: `Invalid primary_cluster: "${dest.primary_cluster}". Allowed: ${ALLOWED_VALUES.primary_cluster.join(', ')}`
    });
  }

  if (dest.transport_hub_tier && !ALLOWED_VALUES.transport_hub_tier.includes(dest.transport_hub_tier)) {
    errors.push({
      type: 'error',
      destination: name,
      field: 'transport_hub_tier',
      message: `Invalid transport_hub_tier: "${dest.transport_hub_tier}". Allowed: ${ALLOWED_VALUES.transport_hub_tier.join(', ')}`
    });
  }

  if (dest.weather_risk_level && !ALLOWED_VALUES.weather_risk_level.includes(dest.weather_risk_level)) {
    errors.push({
      type: 'error',
      destination: name,
      field: 'weather_risk_level',
      message: `Invalid weather_risk_level: "${dest.weather_risk_level}". Allowed: ${ALLOWED_VALUES.weather_risk_level.join(', ')}`
    });
  }

  if (dest.crowd_level && !ALLOWED_VALUES.crowd_level.includes(dest.crowd_level)) {
    errors.push({
      type: 'error',
      destination: name,
      field: 'crowd_level',
      message: `Invalid crowd_level: "${dest.crowd_level}". Allowed: ${ALLOWED_VALUES.crowd_level.join(', ')}`
    });
  }

  if (dest.planning_effort_level && !ALLOWED_VALUES.planning_effort_level.includes(dest.planning_effort_level)) {
    errors.push({
      type: 'error',
      destination: name,
      field: 'planning_effort_level',
      message: `Invalid planning_effort_level: "${dest.planning_effort_level}". Allowed: ${ALLOWED_VALUES.planning_effort_level.join(', ')}`
    });
  }

  // Validate best_seasons
  if (dest.best_seasons) {
    if (!Array.isArray(dest.best_seasons)) {
      errors.push({
        type: 'error',
        destination: name,
        field: 'best_seasons',
        message: 'best_seasons must be an array'
      });
    } else {
      dest.best_seasons.forEach((season: string) => {
        if (!ALLOWED_VALUES.seasons.includes(season)) {
          errors.push({
            type: 'error',
            destination: name,
            field: 'best_seasons',
            message: `Invalid season: "${season}". Allowed: ${ALLOWED_VALUES.seasons.join(', ')}`
          });
        }
      });
    }
  }

  // Validate role_options
  if (dest.role_options) {
    if (!Array.isArray(dest.role_options)) {
      errors.push({
        type: 'error',
        destination: name,
        field: 'role_options',
        message: 'role_options must be an array'
      });
    } else {
      dest.role_options.forEach((role: string) => {
        if (!ALLOWED_VALUES.role_options.includes(role)) {
          errors.push({
            type: 'error',
            destination: name,
            field: 'role_options',
            message: `Invalid role: "${role}". Allowed: ${ALLOWED_VALUES.role_options.join(', ')}`
          });
        }
      });
    }
  }

  // Validate min_recommended_stay_days
  if (dest.min_recommended_stay_days !== undefined) {
    if (typeof dest.min_recommended_stay_days !== 'number' || dest.min_recommended_stay_days < 1) {
      errors.push({
        type: 'error',
        destination: name,
        field: 'min_recommended_stay_days',
        message: `min_recommended_stay_days must be a number >= 1, got: ${dest.min_recommended_stay_days}`
      });
    }
  }

  // Validate base_description
  if (dest.base_description && typeof dest.base_description === 'string') {
    const sentenceCount = dest.base_description.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    if (sentenceCount > 3) {
      errors.push({
        type: 'warning',
        destination: name,
        field: 'base_description',
        message: `base_description should be 1-2 sentences, has ${sentenceCount}`
      });
    }
  }

  // Validate image_url
  if (dest.image_url && typeof dest.image_url === 'string') {
    if (!dest.image_url.startsWith('http://') && !dest.image_url.startsWith('https://')) {
      errors.push({
        type: 'warning',
        destination: name,
        field: 'image_url',
        message: 'image_url should be a full URL starting with http:// or https://'
      });
    }
  }
});

// Validate Transport Connections
console.log('🔍 Validating transportConnections.json...\n');

const connections = transportData.connections;
const connectionPairs = new Set<string>();

connections.forEach((conn: any, index: number) => {
  const id = `${conn.origin_id} → ${conn.destination_id}`;

  // Required fields check
  const requiredFields = ['origin_id', 'destination_id', 'mode', 'duration_hours', 'comfort_level'];

  requiredFields.forEach(field => {
    if (!(field in conn)) {
      errors.push({
        type: 'error',
        field,
        message: `Connection ${index + 1}: Missing required field: ${field}`
      });
    }
  });

  // Validate origin and destination exist
  if (conn.origin_id && !destinationIds.has(conn.origin_id)) {
    errors.push({
      type: 'error',
      field: 'origin_id',
      message: `Connection ${id}: origin_id "${conn.origin_id}" not found in destinations`
    });
  }

  if (conn.destination_id && !destinationIds.has(conn.destination_id)) {
    errors.push({
      type: 'error',
      field: 'destination_id',
      message: `Connection ${id}: destination_id "${conn.destination_id}" not found in destinations`
    });
  }

  // Check for duplicate connections
  const pairKey = `${conn.origin_id}-${conn.destination_id}`;
  if (connectionPairs.has(pairKey)) {
    errors.push({
      type: 'error',
      field: 'connection',
      message: `Duplicate connection: ${id}`
    });
  }
  connectionPairs.add(pairKey);

  // Validate mode
  if (conn.mode && !ALLOWED_VALUES.transport_mode.includes(conn.mode)) {
    errors.push({
      type: 'error',
      field: 'mode',
      message: `Connection ${id}: Invalid mode "${conn.mode}". Allowed: ${ALLOWED_VALUES.transport_mode.join(', ')}`
    });
  }

  // Validate comfort_level
  if (conn.comfort_level && !ALLOWED_VALUES.comfort_level.includes(conn.comfort_level)) {
    errors.push({
      type: 'error',
      field: 'comfort_level',
      message: `Connection ${id}: Invalid comfort_level "${conn.comfort_level}". Allowed: ${ALLOWED_VALUES.comfort_level.join(', ')}`
    });
  }

  // Validate duration_hours
  if (conn.duration_hours !== undefined) {
    if (typeof conn.duration_hours !== 'number' || conn.duration_hours <= 0) {
      errors.push({
        type: 'error',
        field: 'duration_hours',
        message: `Connection ${id}: duration_hours must be a positive number, got: ${conn.duration_hours}`
      });
    }
  }
});

// Coverage validation
console.log('🔍 Validating coverage requirements...\n');

const expectedDestinations = 20;
const expectedConnections = 20 * 19; // 380 unidirectional connections

if (destinations.length !== expectedDestinations) {
  errors.push({
    type: 'warning',
    field: 'destinations',
    message: `Expected ${expectedDestinations} destinations, found ${destinations.length}`
  });
}

if (connections.length !== expectedConnections) {
  errors.push({
    type: 'warning',
    field: 'connections',
    message: `Expected ${expectedConnections} connections (full mesh), found ${connections.length}`
  });
}

// Check for missing connections (full mesh validation)
const destinationIdArray = Array.from(destinationIds);
const missingConnections: string[] = [];

destinationIdArray.forEach(origin => {
  destinationIdArray.forEach(dest => {
    if (origin !== dest) {
      const pairKey = `${origin}-${dest}`;
      if (!connectionPairs.has(pairKey)) {
        missingConnections.push(`${origin} → ${dest}`);
      }
    }
  });
});

if (missingConnections.length > 0) {
  errors.push({
    type: 'error',
    field: 'connections',
    message: `Missing ${missingConnections.length} connections for full mesh coverage. First 5: ${missingConnections.slice(0, 5).join(', ')}`
  });
}

// Print Results
console.log('═'.repeat(60));
console.log('VALIDATION RESULTS');
console.log('═'.repeat(60));
console.log();

const errorCount = errors.filter(e => e.type === 'error').length;
const warningCount = errors.filter(e => e.type === 'warning').length;

if (errors.length === 0) {
  console.log('✅ All validations passed!');
  console.log();
  console.log(`📊 Summary:`);
  console.log(`   - ${destinations.length} destinations validated`);
  console.log(`   - ${connections.length} transport connections validated`);
  console.log(`   - ${VALID_INTERESTS.length} interest options defined`);
  console.log();
  process.exit(0);
} else {
  // Print errors
  if (errorCount > 0) {
    console.log(`❌ ${errorCount} ERROR(S) FOUND:\n`);
    errors.filter(e => e.type === 'error').forEach(err => {
      const loc = err.destination ? `[${err.destination}] ` : '';
      console.log(`   ${loc}${err.field}: ${err.message}`);
    });
    console.log();
  }

  // Print warnings
  if (warningCount > 0) {
    console.log(`⚠️  ${warningCount} WARNING(S):\n`);
    errors.filter(e => e.type === 'warning').forEach(err => {
      const loc = err.destination ? `[${err.destination}] ` : '';
      console.log(`   ${loc}${err.field}: ${err.message}`);
    });
    console.log();
  }

  console.log('═'.repeat(60));
  console.log(`Summary: ${errorCount} errors, ${warningCount} warnings`);
  console.log('═'.repeat(60));
  console.log();

  process.exit(errorCount > 0 ? 1 : 0);
}
