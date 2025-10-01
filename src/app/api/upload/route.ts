import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Please select an image file' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image size should be less than 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
        console.log('Created uploads directory:', uploadsDir);
      }
    } catch (dirError) {
      console.error('Error creating directory:', dirError);
      return NextResponse.json({ error: 'Could not create upload directory' }, { status: 500 });
    }

    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `project-${timestamp}${extension}`;
    const filepath = path.join(uploadsDir, filename);

    try {
      await writeFile(filepath, buffer);
      console.log('File saved successfully:', filepath);
    } catch (writeError) {
      console.error('Error writing file:', writeError);
      return NextResponse.json({ error: 'Could not save file' }, { status: 500 });
    }

    const url = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}