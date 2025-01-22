<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // Fetch all articles
    public function index()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    // Create a new article
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'summary' => 'required|string',
            'date' => 'required|date',
            'publisher' => 'required|string',
        ]);

        $article = Article::create($validated);
        return response()->json($article, 201);
    }

    // Fetch a single article
    public function show($id)
    {
        $article = Article::find($id);
        return response()->json($article);
    }

    // Update an existing article
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'summary' => 'required|string',
            'date' => 'required|date',
            'publisher' => 'required|string',
        ]);

        $article = Article::find($id);
        $article->update($validated);
        return response()->json($article);
    }

    // Delete an article
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();
        return response()->json(null, 204);
    }
}

